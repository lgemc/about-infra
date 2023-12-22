resource "aws_route_table" "main_route" {
  vpc_id = var.main_vpc_id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = var.main_internet_gateway_id
  }

  tags = {
    Service = "main"
    Name    = "main-route-table"
  }
}



output "main_route_table_id" {
  value = aws_route_table.main_route.id
}
