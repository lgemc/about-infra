resource "aws_eip" "main_eip" {
  instance = var.main_node_id
  vpc      = true

  tags = {
    "Service" = "main"
    "Name"    = "main_eip"
  }
}

resource "aws_eip" "etcd" {
  instance = var.etcd_node_id
  vpc      = true

  tags = {
    "Service" = "main"
    "Name"    = "etcd"
  }
}

resource "aws_eip" "child_0_node" {
  instance = var.child_0_node_id
  vpc      = true

  tags = {
    Service = "main"
    Name    = "child_0_node"
  }
}

output "main_eip_address" {
  value = aws_eip.main_eip.address
}

output "etcd_eip_address" {
  value = aws_eip.etcd.address
}

output "child_0_node_eip_address" {
  value = aws_eip.child_0_node.address
}
