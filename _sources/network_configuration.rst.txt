.. _network_configuration:

Network Configuration
=====================

Introduction
------------

This section covers the configuration of networks in the host.yml file. Network configuration is essential for setting up your virtual lab instances in Proxmox with the proper networking settings.

Currently, this is accomplished by modifying the ``/etc/network/interfaces`` on the Proxmox host itself. Due to this, it is important that the following configuration is followed as any misconfiguration could potentially disrupt network connectivity. 


.. tip:: You'll have to manually connect to your server if network connectivity is lost. The default configuration is located in ``config/interface.conf`` of the toolkit's directory

.. important:: The network configuration was setup for a Dell R710 server. You'll have to adjust the interfaces in ``/etc/network/interfaces`` if your network interface name and amount differs. 

Network Configuration Attributes
--------------------------------

The network configuration is defined under the `network` block in the host.yml file. It is important to note that "bridges" must be unique and follow the following format: vmbrXX where XX is a number 01-99

Each network has the following attributes:

* ``address`` (required): The IP address and subnet mask for the network. The format is "IP_address/Subnet_mask," e.g., "172.16.0.1/24".
* ``bridge`` (required): The name of the bridge interface in Proxmox that this network will be connected to, e.g., "vmbr20".




Example
-------

Here's an example of a network configuration in the host.yml file. In the following example, we declare two network interfaces and their subnets:

.. code-block:: yaml

   network:
     - address: "172.16.0.1/24"
       bridge: "vmbr20"
     - address: "172.16.2.1/24"
       bridge: "vmbr21"

This configuration creates two networks, one with the IP address "172.16.0.1" and subnet mask "255.255.255.0" connected to the "vmbr20" bridge, and the other with the IP address "172.16.2.1" and subnet mask "255.255.255.0" connected to the "vmbr21" bridge.

The ``bridge`` value can now be referenced in your ``host`` block to annotate which subnet your machines will connect to.


Tool
----

Note - the copy mechanism does not capture the required YAML indentation. It is simply meant to assist you in displaying how the values should appear. 


.. raw:: html

   <div>
      <label for="address-input">Address:</label>
      <input type="text" id="address-input" placeholder="172.16.0.1/24">
   </div>
   <div>
      <label for="bridge-input">Bridge:</label>
      <input type="text" id="bridge-input" placeholder="vmbr20">
   </div>
   <button id="add-yaml">Add</button>
   <button id="clear-yaml">Clear</button>
   <textarea id="yaml-output" rows="10" cols="50" readonly></textarea>
   <button id="copy-yaml">Copy YAML</button>
   <script src="_static/networkconfig.js"></script>


   
