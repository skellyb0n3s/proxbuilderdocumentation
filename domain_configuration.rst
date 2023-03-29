Domain Configuration
====================

A domain object is a component that specifies attributes of a domain. A domain object's attributes include:

- ``domain``: The domain name.
- ``domain_controller``: The domain controller hostname.
- ``netbios_name``: The NetBIOS name for the domain. (see below for an example)
- ``domain_password``: The domain Administrator password.

A domain object can have other objects to customize the Active Directory environment. These domain objects are:

- users: (Optional) A list of user objects associated with the domain.
- groups: (Optional) A list of group objects associated with the domain.
- organisation_units: (Optional) A list of OU objects associated with the domain.
- acls: (Optional) A list of ACL objects associated with the domain.
- scripts: (Optional) Execute a script once the host is deployed in the environment. 

.. tip:: The script's intent was to introduce vulnerabilities into the network. It can be adjusted for other usages.

Domain Object Example
----------------------

.. code-block:: yaml
   :emphasize-lines: 13, 18, 20
   :linenos:

    hosts:
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

    forests:
      domains:
        - domain: "windomain.local"
          domain_controller: "testserver"
          netbios_name: "WINDOMAIN"
          domain_password: "ElitePassw0rd123_"



Customizing Active Directory Environment
----------------------------------------

For more detailed information on configuring users, groups, OUs, and ACLs, refer to the following sub-sections:

