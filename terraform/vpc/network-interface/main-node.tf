resource "aws_network_interface" "main_node_interface" {
  subnet_id = var.main_subnet_id

  private_ips = ["192.168.0.13"]

  tags = {
    "Service" = "main"
    Name      = "main_node_interface"
  }
}

resource "aws_network_interface_sg_attachment" "attachment" {
  security_group_id    = var.main_security_group_id
  network_interface_id = aws_network_interface.main_node_interface.id
}

output "main_node_interface_id" {
  value = aws_network_interface.main_node_interface.id
}
