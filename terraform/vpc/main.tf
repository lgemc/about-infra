module "vpc" {
  source              = "./vpc"
  main_route_table_id = module.route_table.main_route_table_id
  main_subnet_id      = module.subnet.main_subnet_id
}

module "subnet" {
  source              = "./subnet"
  main_vpc_id         = module.vpc.main_vpc_id
  main_route_table_id = module.route_table.main_route_table_id
}

module "route_table" {
  source                   = "./route-table"
  main_vpc_id              = module.vpc.main_vpc_id
  main_internet_gateway_id = module.internet_gateway.main_internet_gateway_id
}

module "network_interface" {
  source                 = "./network-interface"
  main_subnet_id         = module.subnet.main_subnet_id
  main_security_group_id = var.main_security_group_id
}

module "internet_gateway" {
  source      = "./gateway"
  main_vpc_id = module.vpc.main_vpc_id
}

output "main_vpc_id" {
  value = module.vpc.main_vpc_id
}

output "main_network_interface_id" {
  value = module.network_interface.main_node_interface_id
}

output "etcd_interface_id" {
  value = module.network_interface.etcd_node_interface_id
}

output "child_0_network_interface_id" {
  value = module.network_interface.child_0_node_interface_id
}

output "main_subnet_id" {
  value = module.subnet.main_subnet_id
}

output "graphics_network_interface_id" {
  value = module.network_interface.graphics_network_interface_id
}
