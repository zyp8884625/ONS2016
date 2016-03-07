#!/bin/bash
for i in {1..5};do
echo "DEMO:Jenkins: Starting Jenkins job demo" > /usr/local/apr/htdocs/ONS2016/testLog && sleep 5
echo "DEMO:TestStation: Starting demoTest.py" >> /usr/local/apr/htdocs/ONS2016/testLog && sleep 5
echo "DEMO:Gerrit: Pulling ONOS and OnosSystemTest" >> /usr/local/apr/htdocs/ONS2016/testLog && sleep 5
echo "DEMO:TestStation: Clean up test environment" >> /usr/local/apr/htdocs/ONS2016/testLog && sleep 5
echo "DEMO:ONOS1: Installing ONOS" >> /usr/local/apr/htdocs/ONS2016/testLog && sleep 5
echo "DEMO:ONOS2: Installing ONOS" >> /usr/local/apr/htdocs/ONS2016/testLog && sleep 5
echo "DEMO:ONOS3: Installing ONOS" >> /usr/local/apr/htdocs/ONS2016/testLog && sleep 5
echo "DEMO:Mininet: Setup the Mininet testbed" >> /usr/local/apr/htdocs/ONS2016/testLog && sleep 5
echo "DEMO:Mininet: Connecting switches to controllers" >> /usr/local/apr/htdocs/ONS2016/testLog && sleep 5
echo "DEMO:ONOS1: Activate sdn-ip application" >> /usr/local/apr/htdocs/ONS2016/testLog && sleep 5
echo "DEMO:Mininet: Creating tunnels between bgp speakers" >> /usr/local/apr/htdocs/ONS2016/testLog && sleep 5
echo "DEMO:Mininet: Ping between bgp peers and speakers" >> /usr/local/apr/htdocs/ONS2016/testLog && sleep 5
echo "DEMO:Mininet: Verify Point-to-Point intents" >> /usr/local/apr/htdocs/ONS2016/testLog && sleep 5
echo "DEMO:ONOS1: Check BGP routes and Multi-point intents" >> /usr/local/apr/htdocs/ONS2016/testLog && sleep 5
echo "DEMO:Mininet: Pinging across BGP routes" >> /usr/local/apr/htdocs/ONS2016/testLog && sleep 5
echo "DEMO:Mininet: Bringing down links between Quagga and the network" >> /usr/local/apr/htdocs/ONS2016/testLog && sleep 5
echo "DEMO:Mininet: Verify lost connectivity across routes" >> /usr/local/apr/htdocs/ONS2016/testLog && sleep 5
echo "DEMO:Mininet: Bringing back up links between Quagga and the network" >> /usr/local/apr/htdocs/ONS2016/testLog && sleep 5
echo "DEMO:Mininet: Verify connectivity is restored across routes" >> /usr/local/apr/htdocs/ONS2016/testLog && sleep 5
echo "DEMO:Wiki: Sending Test report" >> /usr/local/apr/htdocs/ONS2016/testLog && sleep 5
done