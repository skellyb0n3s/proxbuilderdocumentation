PackerBuilder
=============

General Notes
-------------

The tooling can assist in generating Packer artifacts for your Proxmox environment. Packer is an open source tool for creating machine images. 
In the context of Proxmox, this enables you to create a "golden" image from which you can reference in your virtual lab configuration document ``config.conf``.

This documentation is meant to provide you with information that explains what the attributes mean and how you could go about creating your own templates.
This step is not needed if you intend to use the prebuild templates. Check the project page weekly as new templates will be pushed out there.

.. warning::

   The "users" attribute is not implemented. Just copy values from the example and paste them in for now.

How To Run
----------

You will need a Proxmox API token to execute the script. Reference (TODO) on how to create a token with the appropriate permissions.

.. code:: console

    $ python3 templateBuilder.py --select [DIRECTORY] --token [PROXMOX-TOKEN] --username '[USERNAME]@pam![TOKENNAME]'

Running the Script
~~~~~~~~~~~~~~~~~~

``DIRECTORY`` corresponds to a folder within ``templates/packer/``. For instance, ``server2019`` corresponds to the server2019 folder in the following output.
This means you want to build a base OS template for a windows server 2019 machine.

.. code:: console

    root@pve:~/labv2/templates/packer# tree -L 1
    .
    ├── debian11
    ├── kali
    ├── knowndebian11
    ├── server2016
    ├── server2019
    ├── win10h1build
    ├── win10_yellow
    └── windows11

``PROXMOX-TOKEN`` is your Proxmox Api token

``USERNAME`` and ``TOKENNAME`` corresponds to your Proxmox username and the token name associated with it. Example: ``'root@pam!terraform'``


startup_script declarations
~~~~~~~~~~~~~~~~~~~~~~~~~~~

The startup_scripts declarations allows you to run additional scripts after the operating system has been installed and configured. This is your last chance to run what is required to further customize your base image.


Pay attention to the ``template_folder`` and ``packer_var`` variables. See the image below for clarification.

Notice that the red line shows that the ``template_folder`` corresponds to the directory name inside /templates/packer directory

The green line shows that the ``packer_var`` variable corresponds to the prefix string of .auto.pkrvars.hcl and .json.pkr.hcl values

.. image:: /_static/packer_build.png
   :alt: Highlighting what variables mean
   :width: 600px

General Structure of an OS Template Entry
-----------------------------------------

.. code-block:: yaml

    # Windows OS Template Entry example
    - operating_system: # (windows | linux)-operating system
      template_folder: # folder that corresponds to the a folder in templates/packer/
      packer_var: # corresponds to the XXXX.auto.pkrvars.hcl and XXXX.json.pkr.hcl in the "template_folder" directory
      specification:
        cpu_num: 1# cpu size - ex. 2
        disk_size: # disk size - ex. 80G
        mem_size: # mem size - ex. 4096
        os_iso_path: # how do you want the iso stored on the proxmox server
        url: # url to download the iso if it doesn't exist
        vm_name: # name of your Proxmox template - ex. server2019-2-x64-template
        os: # os type - see acceptable types
      authentication:
        winrm_username: # username to use for local admin account - this will be used by Ansible
        winrm_password: # password to use for local admin account - used by ansible
      users:
        - group: "" # not in use
          username: "" # not in use
          password: "" # not in use
      startup_scripts: # scripts located in templates/packer/[foldername]/scripts/
        - path: scripts/disable-hibernate.ps1
        - path: scripts/disablewinupdate.bat
        - path: scripts/install-virt.ps1


Example Configuration For Windows OS Template 
---------------------------------------------
.. code-block:: yaml

  - operating_system: windows-server2019
    template_folder: "server2019"
    packer_var: "server2019"
    specification:
      cpu_num: 2
      disk_size: 80G
      mem_size: 4096
      os_iso_path: server2019_1.iso
      url: "https://go.microsoft.com/fwlink/p/?LinkID=2195167&clcid=0x409&culture=en-us&country=US"
      vm_name: server2019-2-x64-template
      os: win10
    authentication:
      winrm_username: "localuser"
      winrm_password: "password"
    users:
      - group: Administrator
        username: localuser
        password: password
    startup_scripts:
      - path: scripts/disable-hibernate.ps1
      - path: scripts/disablewinupdate.bat
      - path: scripts/install-virt.ps1

Example Configuration For Linux OS Template 
-------------------------------------------

.. code-block:: yaml

  - operating_system: linux-kali
    template_folder: "kali"
    packer_var: "kali"
    specification:
      cpu_num: 2
      disk_size: 50G
      mem_size: 4096
      os_iso_path: kali2022-4.iso
      vm_name: kali-x64-autotemplate
      os: l26
      url: "https://cdimage.kali.org/kali-2022.4/kali-linux-2022.4-installer-amd64.iso"
    authentication:
      ssh_username: "kali"
      ssh_password: "kali"
    users:
      - group: Administrator
        username: localuser
        password: password
