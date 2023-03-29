Example Deployment
==================

In this section, we'll provide some example YAML configuration files and an illustration of the final state of the environment they create.

No Routers, One Host
--------------------

.. code-block:: yaml

    hosts:
      - name: "test-windows"
        template: "win10-21h1-x64-autotemplate"
        description: "im a lonely host"
        type: "windows"
        roles:
          - none
        vars:
          vmid: ""
          hostname: "WINDOWSBOX"

No Routers, Two Hosts
---------------------

.. code-block:: yaml

    hosts:
      - name: "test-windows"
        template: "windows11-x64-template"
        description: "im a lonely host"
        type: "windows"
        roles:
          - none
        vars:
          vmid: ""
          hostname: "WINDOWSBOX"

      - name: "test-server"
        template: "win2016-x64-template"
        description: "im a lonely server"
        type: "windows"
        roles:
          - none
        vars:
          vmid: ""
          hostname: "SERVERBOX"

One Router, One Interface, One host
-----------------------------------

.. code-block:: yaml

    network:
      - address: "172.16.0.1/24"
        bridge: "vmbr20"

    hosts:
      - name: "test-router"
        template: "debian11-template"
        description: "just a test router"
        type: "router"
        roles:
          - debian-router
        vars:
          vmid: ""
          interfaces:
            - internal_ip: "172.16.0.254"
              interface: "ens19"
              dhcp_start: "172.16.0.2"
              dhcp_end: "172.16.0.250"
              dhcp_mask: "255.255.255.0"
              bridge: "vmbr20"
              route: "172.16.0.0/24"

      - name: "test-server"
        template: "server2019-2-x64-template"
        description: "two window test"
        type: "windows"
        roles:
          - none
        network: "vmbr20"
        vars:
          vmid: ""
          hostname: "testserver"


One Router, Two interfaces, Two hosts
-------------------------------------

.. code-block:: yaml

    network:
      - address: "172.16.0.1/24"
        bridge: "vmbr20"
      - address: "172.16.10.1/24"
        bridge: "vmbr30"
    
    hosts:
      - name: "test-router"
        template: "debian11-template"
        description: "just a test router"
        type: "router"
        roles:
          - debian-router
        vars:
          vmid: ""
          interfaces:
            - internal_ip: "172.16.0.254"
              interface: "ens19"
              dhcp_start: "172.16.0.2"
              dhcp_end: "172.16.0.250"
              dhcp_mask: "255.255.255.0"
              bridge: "vmbr20"
              route: "172.16.0.0/24"
            - internal_ip: "172.16.10.254"
              interface: "ens20"
              dhcp_start: "172.16.10.2"
              dhcp_end: "172.16.10.250"
              dhcp_mask: "255.255.255.0"
              bridge: "vmbr30"
              route: "172.16.10.0/24"
    
      - name: "test-server"
        template: "server2019-2-x64-template"
        description: "host in first interface"
        type: "windows"
        roles:
          - none
        network: "vmbr20"
        vars:
          vmid: ""
          hostname: "testserver"
    
      - name: "test-server2"
        template: "server2019-2-x64-template"
        description: "host in second interface"
        type: "windows"
        roles:
          - none
        network: "vmbr30"
        vars:
          vmid: ""
          hostname: "testserver2"


Two Routers, One interfaces, One hosts
--------------------------------------


Simple Windows Deployment and Attack Setup
------------------------------------------


Simple Active Directory Setup
-----------------------------
In this setup, we deploy a domain controller with a windows host and one user 

.. code-block:: yaml

    network:
      - address: "172.16.0.1/24"
        bridge: "vmbr20"

    hosts:
      - name: "test-router"
        template: "debian11-template"
        description: "just a test router"
        type: "router"
        roles:
          - debian-router
        vars:
          vmid: ""
          interfaces:
            - internal_ip: "172.16.0.254"
              interface: "ens19"
              dhcp_start: "172.16.0.2"
              dhcp_end: "172.16.0.250"
              dhcp_mask: "255.255.255.0"
              bridge: "vmbr20"
              route: "172.16.0.0/24"

      - name: "test-server"
        template: "win2016-x64-template"
        description: "two window test"
        type: "windows"
        network: "vmbr20"
        roles:
          - domain_controller
        vars:
          vmid: ""
          hostname: "testserver"
          local_admin_password: "ElitePassw0rd123_"
          domain: "windomain.local"
          path: "DC=windomain,DC=local"

      - name: "test-workstation"
        template: "win10-21h1-x64-autotemplate"
        description: "testing server deployment"
        type: "windows"
        network: "vmbr20"
        roles:
          - windows_workstation
        vars:
          vmid: ""
          domain: "windomain.local"
          hostname: "testhost"

    forests:
      domains:
        - domain: "windomain.local"
          domain_controller: "testserver"
          netbios_name: "WINDOMAIN"
          domain_password: "ElitePassw0rd123_"
          users:
            - username: "testadmin"
              firstname: "test"
              lastname: "test"
              password: "VeryS3cureP@ssw0rd"
              description: "test admin"
              path: "CN=Users,DC=windomain,DC=local"



Complex Active Directory Setup
------------------------------

.. code-block:: yaml

    network:
      - address: 172.15.0.0/24
        bridge: vmbr19
      - address: 172.16.0.0/24
        bridge: vmbr20
    hosts:
      - name: router1
        template: debian11-template
        description: just a test router
        type: router
        roles:
          - debian-router
        vars:
          vmid: ''
          interfaces:
            - internal_ip: 172.15.0.254
              interface: ens19
              dhcp_start: 172.15.0.2
              dhcp_end: 172.15.0.250
              dhcp_mask: 255.255.255.0
              bridge: vmbr19
              route: 172.15.0.0/24
            - internal_ip: 172.16.0.254
              interface: ens20
              dhcp_start: 172.16.0.2
              dhcp_end: 172.16.0.250
              dhcp_mask: 255.255.255.0
              bridge: vmbr20
              route: 172.16.0.0/24
      - name: dc1
        template: server2019-2-x64-template
        description: just a single host
        type: windows
        network: vmbr19
        roles:
          - domain_controller
        vars:
          vmid: ''
          hostname: dc1
          local_admin_password: ElitePassw0rd123_
          domain: windomain.local
          path: 'DC=windomain,DC=local'
      - name: test-workstation
        template: win10-21h1-x64-autotemplate
        description: testing server deployment
        type: windows
        network: vmbr19
        roles:
          - windows_workstation
        vars:
          vmid: ''
          domain: windomain.local
          hostname: testhost
      - name: kali
        template: kali-x64-autotemplate
        description: just a single host
        type: linux
        network: vmbr20
        roles:
          - none
        vars:
          vmid: ''
          hostname: kali
    forests:
      domains:
        - domain: windomain.local
          domain_controller: dc1
          netbios_name: WINDOMAIN
          domain_password: ElitePassw0rd123_
          users:
            - username: testadmin
              firstname: test
              lastname: test
              password: VeryS3cureP@ssw0rd
              description: test admin
              path: 'CN=Users,DC=windomain,DC=local'
            - username: testuser
              firstname: test
              lastname: test
              password: VeryS3cureP@ssw0rd
              description: test user
              path: 'CN=Users,DC=windomain,DC=local'
          organisation_units:
            - name: TestWorkstations
          groups:
            global:
              - path: redcircle
                managed_by: testadmin
          acls:
            - for: testadmin
              to: redcircle
              right: GenericAll
              inheritance: None


Elastic Fusion (Experimental)
-----------------------------

Cyber SandBox Creator - Scenario 1 (0 router, 1 network , 1 host)
-----------------------------------------------------------------

.. code-block:: yaml

   hosts:
     - name: "home"
       template: "debian11-template"
       description: "just a single host"
       type: "linux"
       roles:
         - none
       vars:
         vmid: ""
         hostname: "single-host"


Cyber SandBox Creator - Scenario 2 (0 router, 1 network , 4 host)
-----------------------------------------------------------------

.. code-block:: yaml

   hosts:
     - name: "debian1"
       template: "debian11-template"
       description: "just a single host"
       type: "linux"
       roles:
         - none
       vars:
         vmid: ""
         hostname: "debian1"

     - name: "debian2"
       template: "debian11-template"
       description: "just a single host"
       type: "linux"
       roles:
         - none
       vars:
         vmid: ""
         hostname: "debian2"

     - name: "kali"
       template: "kali-x64-autotemplate"
       description: "just a single host"
       type: "linux"
       roles:
         - none
       vars:
         vmid: ""
         hostname: "kali"

     - name: "windows2019"
       template: "server2019-2-x64-template"
       description: "just a single host"
       type: "windows"
       roles:
         - none
       vars:
         vmid: ""
         hostname: "windows2019"


Cyber SandBox Creator - Scenario 3 (1 router, 1 network , 1 host)
-----------------------------------------------------------------

Note - The following will say ssh failed to connect but the instance will be properly configured 


.. code-block:: yaml

   network:
     - address: "10.10.30.0/24"
       bridge: "vmbr19"

   hosts:
     - name: "test-router"
       template: "debian11-template"
       description: "just a test router"
       type: "router"
       roles:
         - debian-router
       vars:
         vmid: ""
         interfaces:
           - internal_ip: "10.10.30.254"
             interface: "ens19"
             dhcp_start: "10.10.30.2"
             dhcp_end: "10.10.30.250"
             dhcp_mask: "255.255.255.0"
             bridge: "vmbr19"
             route: "10.10.30.0/24"

     - name: "debian1"
       template: "debian11-template"
       description: "just a single host"
       type: "linux"
       network: "vmbr19"
       roles:
         - none
       vars:
         vmid: ""
         hostname: "debian1"

Cyber SandBox Creator - Scenario 4 (2 router, 2 network , 2 host)
-----------------------------------------------------------------

Note - The following will say ssh failed to connect but the instance will be properly configured 


.. code-block:: yaml

   network:
     - address: "172.15.0.0/24"
       bridge: "vmbr19"
     - address: "172.16.0.0/24"
       bridge: "vmbr20"

   hosts:
     - name: "server-router"
       template: "debian11-template"
       description: "just a test router"
       type: "router"
       roles:
         - debian-router
       vars:
         vmid: ""
         interfaces:
           - internal_ip: "172.15.0.254"
             interface: "ens19"
             dhcp_start: "172.15.0.2"
             dhcp_end: "172.15.0.250"
             dhcp_mask: "255.255.255.0"
             bridge: "vmbr19"
             route: "172.15.0.0/24"

     - name: "home-router"
       template: "debian11-template"
       description: "just a test router"
       type: "router"
       roles:
         - debian-router
       vars:
         vmid: ""
         interfaces:
           - internal_ip: "172.16.0.254"
             interface: "ens19"
             dhcp_start: "172.16.0.2"
             dhcp_end: "172.16.0.250"
             dhcp_mask: "255.255.255.0"
             bridge: "vmbr20"
             route: "172.16.0.0/24"

     - name: "server"
       template: "debian11-template"
       description: "just a single host"
       type: "linux"
       network: "vmbr19"
       roles:
         - none
       vars:
         vmid: ""
         hostname: "server"

     - name: "home"
       template: "debian11-template"
       description: "just a single host"
       type: "linux"
       network: "vmbr20"
       roles:
         - none
       vars:
         vmid: ""
         hostname: "home"




Cyber SandBox Creator - Scenario 5 (2 router, 4 network , 4 host)
-----------------------------------------------------------------

.. code-block:: yaml

    network:
      - address: "172.15.0.0/24"
        bridge: "vmbr19"
      - address: "172.16.0.0/24"
        bridge: "vmbr20"
      - address: "172.30.0.0/24"
        bridge: "vmbr30"
      - address: "172.40.0.0/24"
        bridge: "vmbr40"  

    hosts:

      - name: "router1"
        template: "debian11-template"
        description: "just a test router"
        type: "router"
        roles:
          - debian-router
        vars:
          vmid: ""
          interfaces:
            - internal_ip: "172.15.0.254"
              interface: "ens19"
              dhcp_start: "172.15.0.2"
              dhcp_end: "172.15.0.250"
              dhcp_mask: "255.255.255.0"
              bridge: "vmbr19"
              route: "172.15.0.0/24"
            - internal_ip: "172.16.0.254"
              interface: "ens20"
              dhcp_start: "172.16.0.2"
              dhcp_end: "172.16.0.250"
              dhcp_mask: "255.255.255.0"
              bridge: "vmbr20"
              route: "172.16.0.0/24"

      - name: "router2"
        template: "debian11-template"
        description: "just a test router"
        type: "router"
        roles:
          - debian-router
        vars:
          vmid: ""
          interfaces:
            - internal_ip: "172.30.0.254"
              interface: "ens19"
              dhcp_start: "172.30.0.2"
              dhcp_end: "172.30.0.250"
              dhcp_mask: "255.255.255.0"
              bridge: "vmbr30"
              route: "172.30.0.0/24"
            - internal_ip: "172.40.0.254"
              interface: "ens20"
              dhcp_start: "172.40.0.2"
              dhcp_end: "172.40.0.250"
              dhcp_mask: "255.255.255.0"
              bridge: "vmbr40"
              route: "172.40.0.0/24"


      - name: "host1"
        template: "server2019-2-x64-template"
        description: "just a single host"
        type: "windows"
        network: "vmbr19"
        roles:
          - none
        vars:
          vmid: ""
          hostname: "host1"

      - name: "host2"
        template: "server2019-2-x64-template"
        description: "just a single host"
        type: "windows"
        network: "vmbr20"
        roles:
          - none
        vars:
          vmid: ""
          hostname: "host2"

      - name: "host3"
        template: "server2019-2-x64-template"
        description: "just a single host"
        type: "windows"
        network: "vmbr30"
        roles:
          - none
        vars:
          vmid: ""
          hostname: "host3"

      - name: "host4"
        template: "server2019-2-x64-template"
        description: "just a single host"
        type: "windows"
        network: "vmbr40"
        roles:
          - none
        vars:
        vmid: ""
        hostname: "host4"       


Cyber SandBox Creator - Scenario 6 (3 router, 5 network , 5 host)
-----------------------------------------------------------------

.. code-block:: yaml

    network:
      - address: "172.15.0.0/24"
        bridge: "vmbr19"
      - address: "172.16.0.0/24"
        bridge: "vmbr20"
      - address: "172.30.0.0/24"
        bridge: "vmbr30"
      - address: "172.40.0.0/24"
        bridge: "vmbr40"  
      - address: "172.50.0.0/24"
        bridge: "vmbr50"    

    hosts:

      - name: "router1"
        template: "debian11-template"
        description: "just a test router"
        type: "router"
        roles:
          - debian-router
        vars:
          vmid: ""
          interfaces:
            - internal_ip: "172.15.0.254"
              interface: "ens19"
              dhcp_start: "172.15.0.2"
              dhcp_end: "172.15.0.250"
              dhcp_mask: "255.255.255.0"
              bridge: "vmbr19"
              route: "172.15.0.0/24"
            - internal_ip: "172.16.0.254"
              interface: "ens20"
              dhcp_start: "172.16.0.2"
              dhcp_end: "172.16.0.250"
              dhcp_mask: "255.255.255.0"
              bridge: "vmbr20"
              route: "172.16.0.0/24"
            - internal_ip: "172.30.0.254"
              interface: "ens21"
              dhcp_start: "172.30.0.2"
              dhcp_end: "172.30.0.250"
              dhcp_mask: "255.255.255.0"
              bridge: "vmbr30"
              route: "172.30.0.0/24"


      - name: "router2"
        template: "debian11-template"
        description: "just a test router"
        type: "router"
        roles:
          - debian-router
        vars:
          vmid: ""
          interfaces:
            - internal_ip: "172.40.0.254"
              interface: "ens19"
              dhcp_start: "172.40.0.2"
              dhcp_end: "172.40.0.250"
              dhcp_mask: "255.255.255.0"
              bridge: "vmbr40"
              route: "172.40.0.0/24"

      - name: "router3"
        template: "debian11-template"
        description: "just a test router"
        type: "router"
        roles:
          - debian-router
        vars:
          vmid: ""
          interfaces:
            - internal_ip: "172.50.0.254"
              interface: "ens19"
              dhcp_start: "172.50.0.2"
              dhcp_end: "172.50.0.250"
              dhcp_mask: "255.255.255.0"
              bridge: "vmbr50"
              route: "172.50.0.0/24"  

        - name: "host1"
          template: "server2019-2-x64-template"
          description: "just a single host"
          type: "windows"
          network: "vmbr19"
          roles:
            - none
          vars:
            vmid: ""
            hostname: "host1"
  
        - name: "host2"
          template: "server2019-2-x64-template"
          description: "just a single host"
          type: "windows"
          network: "vmbr20"
          roles:
            - none
          vars:
            vmid: ""
            hostname: "host2"
            
        - name: "host3"
          template: "server2019-2-x64-template"
          description: "just a single host"
          type: "windows"
          network: "vmbr30"
          roles:
            - none
          vars:
            vmid: ""
            hostname: "host3"     
    
        - name: "host4"
          template: "server2019-2-x64-template"
          description: "just a single host"
          type: "windows"
          network: "vmbr40"
          roles:
            - none
          vars:
            vmid: ""
            hostname: "host4"     
    
        - name: "host5"
          template: "server2019-2-x64-template"
          description: "just a single host"
          type: "windows"
          network: "vmbr50"
          roles:
            - none
          vars:
            vmid: ""
            hostname: "host5" 


Cyber SandBox Creator - BigBroker
---------------------------------

.. code-block:: yaml

    network:
      - address: 172.18.1.0/24
        bridge: vmbr19
      - address: 10.1.0.0/24
        bridge: vmbr20
    hosts:
      - name: bigbrokerrouter
        template: debian11-template
        description: just a test router
        type: router
        roles:
          - debian-router
        vars:
          vmid: ''
          interfaces:
            - internal_ip: 172.18.1.254
              interface: ens19
              dhcp_start: 172.18.1.2
              dhcp_end: 172.18.1.250
              dhcp_mask: 255.255.255.0
              bridge: vmbr19
              route: 172.18.1.0/24
      - name: internetrouter
        template: debian11-template
        description: just a test router
        type: router
        roles:
          - debian-router
        vars:
          vmid: ''
          interfaces:
            - internal_ip: 10.1.0.254
              interface: ens19
              dhcp_start: 10.1.0.2
              dhcp_end: 10.1.0.250
              dhcp_mask: 255.255.255.0
              bridge: vmbr20
              route: 10.1.0.0/24
      - name: web
        template: debian11-template
        description: just a single host
        type: linux
        network: vmbr19
        roles:
          - none
        vars:
          vmid: ''
          hostname: web
      - name: workstation
        template: debian11-template
        description: just a single host
        type: linux
        network: vmbr19
        roles:
          - none
        vars:
          vmid: ''
          hostname: workstation
      - name: database
        template: debian11-template
        description: just a single host
        type: linux
        network: vmbr19
        roles:
          - none
        vars:
          vmid: ''
          hostname: database
      - name: kali
        template: kali-x64-autotemplate
        description: just a single host
        type: linux
        network: vmbr20
        roles:
          - none
        vars:
          vmid: ''
          hostname: kali
      - name: client
        template: debian11-template
        description: just a single host
        type: linux
        network: vmbr20
        roles:
          - none
        vars:
          vmid: ''
          hostname: client


Final Environment
-----------------

Here's an illustration of the final state of the environment created by the above configuration files.

.. image:: /path/to/your/image/final_environment.png
   :alt: Final environment illustration
   :width: 600px