resource "aws_network_interface" "graphics_interface" {
  subnet_id = var.main_subnet_id

  private_ips = ["192.168.0.14"]

  tags = {
    "Service" = "main"
    Name      = "graphics"
  }
}

resource "aws_network_interface_sg_attachment" "graphics_attachment" {
  security_group_id    = var.main_security_group_id
  network_interface_id = aws_network_interface.graphics_interface.id
}

output "graphics_network_interface_id" {
  value = aws_network_interface.graphics_interface.id
}
