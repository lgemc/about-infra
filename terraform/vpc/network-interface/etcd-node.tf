resource "aws_network_interface" "etcd_interface" {
  subnet_id = var.main_subnet_id

  private_ips = ["192.168.0.11"]

  tags = {
    "Service" = "main"
    Name      = "etcd"
  }
}

resource "aws_network_interface_sg_attachment" "etcd_attachment" {
  security_group_id    = var.main_security_group_id
  network_interface_id = aws_network_interface.etcd_interface.id
}

output "etcd_node_interface_id" {
  value = aws_network_interface.etcd_interface.id
}
