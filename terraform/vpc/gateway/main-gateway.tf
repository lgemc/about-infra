resource "aws_internet_gateway" "main_gw" {
  vpc_id = var.main_vpc_id
  tags = {
    "Service" = "main"
    "Name"    = "main-gw"
  }
}

output "main_internet_gateway_id" {
  value = aws_internet_gateway.main_gw.id
}
