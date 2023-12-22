resource "aws_subnet" "main_subnet" {
  vpc_id            = var.main_vpc_id
  cidr_block        = "192.168.0.0/28"
  availability_zone = "us-east-1d"
  tags = {
    "Name"    = "main_subnet"
    "Service" = "main"
  }
}

resource "aws_route_table_association" "main" {
  subnet_id      = aws_subnet.main_subnet.id
  route_table_id = var.main_route_table_id
}

output "main_subnet_id" {
  value = aws_subnet.main_subnet.id
}
