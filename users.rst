Users Configuration
===================

A domain object can have an optional list of user objects. Each user object specifies the attributes of a user in the domain.

Example Users Configuration
---------------------------

.. code-block:: yaml

  users:
    - username: "testadmin"
      firstname: "test"
      lastname: "test"
      password: "VeryS3cureP@ssw0rd"
      description: "test admin"
      groups: ["Domain Admins"]
      path: "CN=Users,DC=windomain,DC=local"

.. warning:: This release requires a strong password. If you do not input a strong password, the deployment will fail

Accepted Variables
-------------------

- ``username``: (Required) The username for the user.
- ``firstname``: (Required) The first name of the user.
- ``lastname``: (Required) The last name of the user.
- ``password``: (Required) The password for the user.
- ``description``: (Required) A description for the user.
- ``groups``: (Required) A list of groups the user should be a member of. Note: List of groups should be inside brackets (i.e. ``["group name"]``)
- ``path``: (Required) The LDAP path for the user. If you don't know what to put, copy and paste ``"CN=Users,DC=windomain,DC=local"``

.. warning::

   the **DC** in your ``path`` declaration should correspond to the ``path`` attribute value of your domain controller
