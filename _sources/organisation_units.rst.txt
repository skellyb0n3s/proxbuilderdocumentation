Organisation Units Configuration
=================================

A domain object can have an optional list of Organisation Unit (OU) objects. Each OU object specifies the attributes of an OU in the domain.

Example Organisation Units Configuration
----------------------------------------

.. code-block:: yaml

  organisation_units:
    - name: "TestWorkstations"

Accepted Variables
-------------------

-- ``name``: (Required) The name of the OU.
-- ``path``: (Optional) see advanced usage

Advanced Usage
--------------
You can specify nested OUs via the ``path`` variable. For instance, the following example shows an OU **RedBeam** being nested under **GreenBeam**. It is important that the ldap path is correct. The toolkit will not check this for you. 

.. code-block:: yaml

  organisation_units:
    - name: "Greenbeam"
    - name: "RedBeam"
      path: "OU=GreenBeam,DC=windomain,DC=local"


