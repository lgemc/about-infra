# resource "aws_instance" "graphics" {
#   ami = "ami-02396cdd13e9a1257" # amazon linux

#   instance_type = "g4dn.xlarge"

#   key_name = "lgmc"

#   root_block_device {
#     delete_on_termination = false
#     volume_size           = 70
#     volume_type           = "standard"
#   }

#   iam_instance_profile = var.main_instance_profile_name
#   network_interface {
#     network_interface_id = var.graphics_network_interface_id
#     device_index         = 0
#   }
#   tags = {
#     "Service" = "main"
#     "Name"    = "graphics"
#   }
# }

# output "graphics_id" {
#   value = aws_instance.graphics.id
# }
