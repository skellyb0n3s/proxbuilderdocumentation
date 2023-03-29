Scripts Configuration
=====================
.. attention:: This configuration operation is purely for the domain-controller!

Scripts give you the ability to further customize the domain controller once it has been provisioned in the environment. 




Accepted Variables
-------------------

- ``name``: (Required) The script to run. Scripts should be located in ``templates/ansible/scripts`` directory
- ``params``: (optional) the parameters required by the script


Example Script Configuration
----------------------------

The following script requires an input parameter of $Identity. The user **testadmin** will be adjusted to suffer the asrep_roasting vulnerability

.. code-block:: yaml

  scripts:
    - name: "asrep_roasting.ps1"
      params: "-Identity testadmin"
