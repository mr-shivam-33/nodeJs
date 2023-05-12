# # Retrieve availability zones
# data "aws_availability_zones" "available" {
#     state = "available"
# }


# #vpc
# resource "aws_vpc" "my_vpc" {
#   cidr_block       = "192.168.0.0/16"
#   instance_tenancy = "default"

#   enable_dns_support = true
#   enable_dns_hostnames = true
#   enable_classiclink = false
#   enable_classiclink_dns_support = false 
#   assign_generated_ipv6_cidr_block = false

#   tags = {
#     Name = "my_vpc"
#   }
# }

# output "vpc_id" {
#     value = aws_vpc.my_vpc.id
#     description = "VPC id."
#     sensitive = false
# }



# # Create internet gateway
# resource "aws_internet_gateway" "my_igw" {
#   vpc_id = aws_vpc.my_vpc.id

#   tags = {
#     Name = "MyIGW"
#   }
# }

# # Create public subnets
# resource "aws_subnet" "public_subnet" {
#   count             = 2
#   vpc_id            = aws_vpc.my_vpc.id
#   cidr_block        = cidrsubnet(aws_vpc.my_vpc.cidr_block, 8, count.index)
#   availability_zone = element(data.aws_availability_zones.available.names, count.index)

#   tags = {
#     Name = "PublicSubnet-${count.index}"
#   }
# }

# # Create private subnets
# resource "aws_subnet" "private_subnet" {
#   count             = length(data.aws_availability_zones.available.names) * 2
#   vpc_id            = aws_vpc.my_vpc.id
#   cidr_block        = cidrsubnet(aws_vpc.my_vpc.cidr_block, 8, 2 + count.index)
#   availability_zone = element(data.aws_availability_zones.available.names, count.index)

#   tags = {
#     Name = "PrivateSubnet-${count.index}"
#   }
# }
