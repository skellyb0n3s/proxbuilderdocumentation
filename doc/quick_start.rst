Quick Start
===========

This quick start guide will help you get started with the Proxmox Automation Toolkit. It assumes you have already installed Proxmox on a dedicated server. If you haven't, please follow the instructions in the `installation guide <installation>`.

1. Clone the Proxmox Automation Toolkit repository:

2. Install the required Python packages: ``pip3 install requirements.txt``

3. Configure your ``host.yml`` file with your desired settings (see ``configuration_overview`` for more information).

4. Run ``python3 buildlab.py --token=[proxmox token id] --username=[username]@pam\![tokenname]``

5. Run the ``packerbuilder.py`` script to build the Packer images (see ``packerbuilder`` for more information):


Building Your Lab
=================

The ``buildlab.py`` script parses the ``host.yml`` config file. Please reference the `configuration_overview` for how to create one. 


Arguments
---------

- ``--token``           (Required) : your proxmox api token for your user account 
- ``--username``        (Required) : proxmox api username. The format must be [username]@pam![tokenname]
- ``--skip-network``    (Optional) : Skip the network interface configuration step (i.e. if you didn't make adjustments to the network block of the configuration file)
- ``--validate``        (Optional) : Just validate the host.yml configuration file

