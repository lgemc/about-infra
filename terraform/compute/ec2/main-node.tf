resource "aws_instance" "main_node" {
  ami = "ami-0fec2c2e2017f4e7b"

  instance_type = "t3a.small"

  key_name = "lgmc"

  root_block_device {
    delete_on_termination = false
    volume_size           = 20
    volume_type           = "standard"
  }

  iam_instance_profile = var.main_instance_profile_name
  network_interface {
    network_interface_id = var.main_network_interface_id
    device_index         = 0
  }
  tags = {
    "Service" = "main"
    "Name"    = "main_node"
  }
}

output "main_node_id" {
  value = aws_instance.main_node.id
}
