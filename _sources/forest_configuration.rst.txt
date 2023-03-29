Forest Configuration
====================

Forests are defined in the ``forests`` section of the ``host.yml`` file. Each forest may have one or more domains. A domain is a separate object that specifies the attributes of a domain.

.. warning:: This release assumes there is one forest. 

Example Forest Configuration
----------------------------

.. code-block:: yaml

  forests:
    domains:
      - domain: "windomain.local"
        domain_controller: "testserver"
        netbios_name: "WINDOMAIN"
        domain_password: "Ufe-bVXSx9rk"

      - domain: "fundomain.local"
        domain_controller: "imatoaster"
        netbios_name: "fundomain"
        domain_password: "xEf-EFgAx9rk"

Domain Configuration
--------------------

For more detailed information on configuring domain objects, see the following sections:

.. toctree::
   :maxdepth: 2

   domain_configuration
   users
   groups
   organisation_units
   acls
   scripts
