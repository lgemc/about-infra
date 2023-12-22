resource "aws_default_network_acl" "default" {
  default_network_acl_id = aws_vpc.main_vpc.default_network_acl_id

  ingress {
    protocol   = -1
    rule_no    = 100
    action     = "allow"
    cidr_block = "0.0.0.0/0"
    from_port  = 0
    to_port    = 0
  }

  subnet_ids = [var.main_subnet_id]
  egress {
    protocol   = -1
    rule_no    = 100
    action     = "allow"
    cidr_block = "0.0.0.0/0"
    from_port  = 0
    to_port    = 0
  }
}

resource "aws_main_route_table_association" "main" {
  vpc_id         = aws_vpc.main_vpc.id
  route_table_id = var.main_route_table_id
}

resource "aws_vpc" "main_vpc" {
  cidr_block = "192.168.0.0/24"


  tags = {
    "Service" = "main"
    "Name"    = "main_vpc"
  }
}

output "main_vpc_id" {
  value = aws_vpc.main_vpc.id
}
