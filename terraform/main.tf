terraform {
  backend "s3" {
    bucket = "atelier-terraform-state"
    key    = "terraform.tfstate"
    region = "us-east-1"
  }
}
provider "aws" {
  region = "us-east-1"
}

module "ecr" {
  source = "./ecr"
}

module "compute" {
  source = "./compute"

  main_vpc_id = module.vpc.main_vpc_id

  graphics_network_interface_id = module.vpc.graphics_network_interface_id
  main_network_interface_id     = module.vpc.main_network_interface_id
  child_0_network_interface_id  = module.vpc.child_0_network_interface_id
  etcd_network_interface_id     = module.vpc.etcd_interface_id
  main_instance_profile_name    = module.iam.main_instance_profile_name
}

module "iam" {
  source = "./iam"
}

module "vpc" {
  source                 = "./vpc"
  main_security_group_id = module.compute.main_security_group_id
}

module "efs" {
  source                 = "./efs"
  main_security_group_id = module.compute.main_security_group_id
  main_subnet_id         = module.vpc.main_subnet_id
}

output "main_eip_address" {
  value = module.compute.main_eip_address
}

output "etcd_eip_address" {
  value = module.compute.etcd_eip_address
}

output "child_0_address" {
  value = module.compute.child0_node_address
}

output "main_efs_file_system_id" {
  value = module.efs.main_efs_file_system_id
}
