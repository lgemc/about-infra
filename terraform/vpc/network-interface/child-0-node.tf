resource "aws_network_interface" "child_0_node_interface" {
  subnet_id = var.main_subnet_id

  private_ips = ["192.168.0.12"]

  tags = {
    "Service" = "main"
    Name      = "child_0_node_interface"
  }
}

resource "aws_network_interface_sg_attachment" "child_attachment" {
  security_group_id    = var.main_security_group_id
  network_interface_id = aws_network_interface.child_0_node_interface.id
}

output "child_0_node_interface_id" {
  value = aws_network_interface.child_0_node_interface.id
}
