Host Configuration
==================

Hosts are defined in the ``hosts`` block of the ``host.yml`` file. Each host object must have a unique name, a template, a description, a type, and a set of roles. Additionally, you can provide custom variables under the `vars` key.

Roles allow you to apply multiple pre-built configurations to the host. A host can have multiple roles although you'll need to keep in mind how they are provisioned in ansible (i.e. the order of the roles matter). Each role may require additional variable declarations which would be added within the vars block.

Host Configuration Attributes
------------------------------

- ``name``: A unique name for the host.
- ``template``: The template to use for creating the host instance. This template MUST exist on the proxmox server
- ``description``: A description of the host.
- ``type``: The type of host, e.g., "router", "windows", "linux". (If the operating system is Kali, the type should be linux)
- ``roles``: A list of roles associated with the host.
- ``network`` (Optional) Attach this virtual machine to the specified interface. This must correspond to an entry specified in the network block segment of your configuration file 
As an example, in the following configuration the windows host has vmbr19 specified as the network interface to attach to. The declaration of that network interface is defined in the "network" block of the configuration file 

.. code-block:: yaml
   :emphasize-lines: 2-3,12
   :linenos:

    network:
      - address: "172.16.0.1/24"
        bridge: "vmbr19"

    hosts:
      - name: "test-server"
        template: "win10-21h1-x64-autotemplate"
        description: "windows host"
        type: "windows"
        roles:
          - none
        network: "vmbr19"
        vars:
          vmid: ""
          hostname: "testserver"


- ``vars``: (Optional) A dictionary containing custom variables for the host.

.. warning::

   Every host ``vars`` must have a ``vmid: ""`` variable set


Example Host Configuration
--------------------------

.. code-block:: yaml

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

Roles
-----

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - Role
     - Description
   * - debian-router
     - A role for Debian-based routers.
   * - windows_workstation
     - A role for Windows-based workstations.
   * - domain_controller
     - A role for setting up a domain controller
   * - kali
     - A role for Kali system.
   * - none
     - Generic Role / Should be used if virtual machine is not assigned specific role


Role: debian-router
-------------------

.. code-block:: yaml

  roles:
    - debian-router

This role is designed for Debian-based routers. It includes the necessary configuration and setup to function as a router in your virtual environment.

Accepted Variables:
~~~~~~~~~~~~~~~~~~~


``interfaces`` (required)

   Interface object that specifies the network interfaces of the router.
   
   ``internal_ip``: (required)
      Must fall within the route attribute range.
      
   ``interface``: (required)
      Must start at ens19 and increment by 1 for additional interfaces.
      
   ``dhcp_start``: (required)
   
   ``dhcp_end``: (required)
   
   ``dhcp_mask``: (required)
      Must correspond to the CIDR notation in the route attribute.
      
   ``bridge``: (required)
      Must correspond to an entry in the network block of the configuration.
      
   ``route``: (required) This is the network / cidr range for that interface 



Role: windows_workstation
-------------------------

This role is designed for Windows-based workstations. It includes the necessary configuration and setup to function as a workstation in your virtual environment.

Accepted Variables:
~~~~~~~~~~~~~~~~~~~

.. code-block:: yaml

  roles:
    - windows_workstation

``domain`` (required)
   Must match an existing domain entry in the domain block of the configuration file.

``hostname`` (required)
   Specifies the hostname for the workstation.




Role: domain_controller
-----------------------

.. code-block:: yaml

  roles:
    - domain_controller

This role is designed for Windows-based workstations. It includes the necessary configuration and setup to function as a workstation in your virtual environment.


Accepted Variables:
~~~~~~~~~~~~~~~~~~~

``hostname``             (required) hostname for the server

``local_admin_password`` (required) Required but not in use

``domain``               (required) The domain in which the domain controller will rule 

``path``                 (required) ldap notation for domain

.. warning::

   the ``path`` should be the distinguished name and include the value specified in ``domain``. See below for an example

.. code-block:: yaml
   :emphasize-lines: 12-13
   :linenos:

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
        local_admin_password: "Str0nGPassw0rd123_"
        domain: "windomain.local"
        path: "DC=windomain,DC=local"


``scripts``              (optional) see the "scripts" page for more information




Role: Kali
----------

.. code-block:: yaml

  roles:
    - ""

This role is designed for Kali attack workstation (not implemented)

Accepted Variables:
~~~~~~~~~~~~~~~~~~~

None



Role: None
----------

.. code-block:: yaml

  roles:
    - None

This role is designed for Kali attack workstation 

Accepted Variables:
~~~~~~~~~~~~~~~~~~~

``hostname`` (required) specifise the hostname for the instance. This works for both Linux/Windows instances


