ACLs Configuration
===================

A domain object can have an optional list of Access Control List (ACL) objects. Each ACL object specifies the attributes of an ACL entry in the domain.

Example ACLs Configuration
--------------------------

.. code-block:: yaml

  acls:
    - for: jbob
      to: testserver$
      right: GenericAll
      inheritance: None

Accepted Variables
-------------------

- ``for``: (Required) The object for whom the ACL entry applies.
- ``to``: (Required) The target of the ACL entry.
- ``right``: (Required) The access rights granted by the ACL entry. See below for acceptable values
- ``inheritance``: (Optional) The inheritance setting for the ACL entry. Acceptable values are ``None`` or ``All``



Standard Rights
~~~~~~~~~~~~~~~

.. code-block:: console

  AccessSystemSecurity
  CreateChild
  Delete
  DeleteChild
  DeleteTree
  ExtendedRight
  GenericAll
  GenericExecute
  GenericRead
  GenericWrite
  ListChildren
  ListObject
  ReadControl
  ReadProperty
  Self
  Synchronize
  WriteDacl
  WriteOwner
  WriteProperty

Extended Rights
~~~~~~~~~~~~~~~

.. code-block:: console

  00299570-246d-11d0-a768-00aa006e0529 {$right = "User-Force-Change-Password"}
  45ec5156-db7e-47bb-b53f-dbeb2d03c40  {$right = "Reanimate-Tombstones"}
  bf9679c0-0de6-11d0-a285-00aa003049e2 {$right = "Self-Membership"}
  ba33815a-4f93-4c76-87f3-57574bff8109 {$right = "Manage-SID-History"}
  1131f6ad-9c07-11d1-f79f-00c04fc2dcd2 {$right = "DS-Replication-Get-Changes-All"}

ACL Extended Values Allowed
~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: console

  Ext-User-Force-Change-Password
  Ext-Self-Self-Membership
  Ext-Write-Self-Membership


.. attention:: The ``for`` attribute assumes it is a user object. This is purely for this iteration of the release and was meant as a safeguard to ensure it referenced a valid object