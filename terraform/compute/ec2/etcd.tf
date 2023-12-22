resource "aws_ebs_volume" "etcd_data" {
  availability_zone = "us-east-1d"
  size              = 2

  tags = {
    Name = "etcd-data"
  }
}

resource "aws_instance" "etcd" {
  ami = "ami-0fec2c2e2017f4e7b"

  instance_type = "t2.nano"

  key_name = "lgmc"

  root_block_device {
    delete_on_termination = false
    volume_size           = 20
    volume_type           = "standard"
  }

  iam_instance_profile = var.main_instance_profile_name
  network_interface {
    network_interface_id = var.etcd_network_interface_id
    device_index         = 0
  }
  tags = {
    "Service" = "main"
    "Name"    = "etcd_node"
  }
}

resource "aws_volume_attachment" "etcd_data_dir" {
  device_name = "/dev/xvdb"
  volume_id   = aws_ebs_volume.etcd_data.id
  instance_id = aws_instance.etcd.id
}

output "etcd_node_id" {
  value = aws_instance.etcd.id
}
