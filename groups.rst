Groups Configuration
====================

A domain object can have an optional list of group objects. Each group object specifies the attributes of a group in the domain. 

This toolkit currently supports two types of groups: **global** and **local**


Example Groups Configuration
----------------------------

.. code-block:: yaml

  groups:
    global:
      - path: "redcircle"
        managed_by: "bobbyjones"
    local:
      - path: "greencircle"

Accepted Variables
-------------------

- ``path``: (Required) The LDAP path for the group (i.e. what is the group's name).
- ``managed_by``: (Optional) The username of the user who manages the group.

.. attention:: Currently you can only specify the groups under the parent domain. Nested OUs are not supported. 

