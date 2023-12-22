module "ec2" {
  source                        = "./ec2"
  main_network_interface_id     = var.main_network_interface_id
  child_0_network_interface_id  = var.child_0_network_interface_id
  graphics_network_interface_id = var.graphics_network_interface_id
  etcd_network_interface_id     = var.etcd_network_interface_id
  main_instance_profile_name    = var.main_instance_profile_name
  main_security_group_id        = module.security_groups.main_security_group_id
}

module "ebs" {
  source = "./ebs"
}

module "security_groups" {
  source = "./security-groups"

  main_vpc_id = var.main_vpc_id
}

module "eip" {
  source = "./eip"

  child_0_node_id = module.ec2.child_0_node_id
  etcd_node_id    = module.ec2.etcd_node_id
  main_node_id    = module.ec2.main_node_id
}

module "s3" {
  source = "./s3"
}

output "main_eip_address" {
  value = module.eip.main_eip_address
}

output "etcd_eip_address" {
  value = module.eip.main_eip_address
}

output "child0_node_address" {
  value = module.eip.child_0_node_eip_address
}

output "main_security_group_id" {
  value = module.security_groups.main_security_group_id
}
