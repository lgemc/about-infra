module "policies" {
  source = "./policies"
}

module "instance_profiles" {
  source              = "./instance-profiles"
  kube_node_role_name = module.roles.kube_node_role_name
}

module "roles" {
  source = "./roles"

  ebs_manager_policy_arn  = module.policies.manage_ebs_policy
  efs_manager_policy_arn  = module.policies.manage_efs_policy
  can_pull_ecr_policy_arn = module.policies.can_pull_ecr_policy
}

output "main_instance_profile_name" {
  value = module.instance_profiles.main_instance_profile_name
}
