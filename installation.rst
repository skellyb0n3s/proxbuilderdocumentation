Installation Guide
===================

This installation guide will walk you through the process of installing Proxmox on a dedicated server. Proxmox Virtual Environment (VE) is an open-source virtualization platform that allows you to manage virtual machines, containers, and storage through an easy-to-use web interface.

1. Download the latest Proxmox VE ISO image from the `official Proxmox website <https://www.proxmox.com/en/downloads>`_.

2. Burn the ISO image to a USB drive or CD/DVD using a tool like Rufus or balenaEtcher.

3. Insert the USB drive or CD/DVD into the dedicated server and boot from it.

4. Follow the on-screen installation prompts. Be sure to configure your network settings and storage options according to your requirements.

5. After the installation is complete, reboot the server.

6. Open a web browser and navigate to the IP address of your Proxmox server. You should see the Proxmox web interface.

7. Log in to the Proxmox web interface using the "root" username and the password you set during the installation process.

8. Update the system packages and install any necessary additional software:

9. apt update && apt upgrade


Depending on what option you selected during the installation process, you may need to adjust the storage sizes of your server. 

There are two storage sources:

 - local (pve)
 
 - local-lvm (pve)

The local (pve) houses your backups and more importantly, your ISO images. If you notice that this allocation is small, you'll want to increase the allocation via the terminal (change the 500G to whatever you see fit):

.. code-block:: bash

   lvremove /dev/pve/data
   vgdisplay pve | grep Free
   lvresize -L +500G /dev/pve/root
   vgdisplay pve
   resize2fs /dev/mapper/pve-root

Then you can readjust your local-lvm volume (which houses your vm templates and the disk space they use)

.. code-block:: bash

   lvcreate -l 1 -n data pve
   lvconvert --type thin-pool pve/data
   lvextend -l +99%FREE pve/data