#vpc
resource "aws_vpc" "main" {
  cidr_block       = "192.168.0.0/16"
  instance_tenancy = "default"

  enable_dns_support = true
  enable_dns_hostnames = true
  enable_classiclink = false
  enable_classiclink_dns_support = false 
  assign_generated_ipv6_cidr_block = false

  tags = {
    Name = "main"
  }
}

output "vpc_id" {
    value = aws_vpc.main.id
    description = "VPC id."
    sensitive = false
}



# internet gateway
resource "aws_internet_gateway" "ig" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "ig"
  }
}



# subnet
# public subnet
resource "aws_subnet" "public_1" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "192.168.0.0/24"
  availability_zone = "ap-south-1a"
  map_public_ip_on_launch = true

  tags = {
    Name = "public-ap-south-1a"
    "kubernetes.io/cluster/eks" = "shared"
    "kubernetes.io/role/elb" = 1
  }
}

resource "aws_subnet" "public_2" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "192.168.1.0/24"
  availability_zone = "ap-south-1b"
  map_public_ip_on_launch = true

  tags = {
    Name = "public-ap-south-1b"
    "kubernetes.io/cluster/eks" = "shared"
    "kubernetes.io/role/elb" = 1
  }
}

# private subnet
resource "aws_subnet" "private_1" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "192.168.3.0/24"
  availability_zone = "ap-south-1a"

  tags = {
    Name = "private-ap-south-1a"
    "kubernetes.io/cluster/eks" = "shared"
    "kubernetes.io/role/internal-elb" = 1
  }
}

resource "aws_subnet" "private_2" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "192.168.4.0/24"
  availability_zone = "ap-south-1a"

  tags = {
    Name = "private-ap-south-1a"
    "kubernetes.io/cluster/eks" = "shared"
    "kubernetes.io/role/internal-elb" = 1
  }
}

resource "aws_subnet" "private_3" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "192.168.5.0/24"
  availability_zone = "ap-south-1b"

  tags = {
    Name = "private-ap-south-1b"
    "kubernetes.io/cluster/eks" = "shared"
    "kubernetes.io/role/internal-elb" = 1
  }
}

resource "aws_subnet" "private_4" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "192.168.6.0/24"
  availability_zone = "ap-south-1b"

  tags = {
    Name = "private-ap-south-1b"
    "kubernetes.io/cluster/eks" = "shared"
    "kubernetes.io/role/internal-elb" = 1
  }
}



# Elastic ip
resource "aws_eip" "nat1" {
  depends_on = [aws_internet_gateway.ig]
}



# Nat gateway
resource "aws_nat_gateway" "ng1" {
  allocation_id = aws_eip.nat1.id
  subnet_id     = aws_subnet.public_1.id

  tags = {
    Name = "NAT 1"
  }
}



# Route table
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id =  aws_internet_gateway.ig.id
  }

  tags = {
    Name = "public"
  }
}

# private
resource "aws_route_table" "private1" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id =  aws_nat_gateway.ng1.id
  }
  tags = {
    Name = "private1"
  }
}

resource "aws_route_table" "private2" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id =  aws_nat_gateway.ng1.id
  }
  tags = {
    Name = "private2"
  }
}

resource "aws_route_table" "private3" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id =  aws_nat_gateway.ng1.id
  }
  tags = {
    Name = "private3"
  }
}

resource "aws_route_table" "private4" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id =  aws_nat_gateway.ng1.id
  }
  tags = {
    Name = "private4"
  }
}



# Route table association
# public
resource "aws_route_table_association" "public1" {
  subnet_id      = aws_subnet.public_1.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public2" {
  subnet_id      = aws_subnet.public_2.id
  route_table_id = aws_route_table.public.id
}

# private
resource "aws_route_table_association" "private1" {
  subnet_id      = aws_subnet.private_1.id
  route_table_id = aws_route_table.private1.id
}

resource "aws_route_table_association" "private2" {
  subnet_id      = aws_subnet.private_2.id
  route_table_id = aws_route_table.private2.id
}

resource "aws_route_table_association" "private3" {
  subnet_id      = aws_subnet.private_3.id
  route_table_id = aws_route_table.private3.id
}

resource "aws_route_table_association" "private4" {
  subnet_id      = aws_subnet.private_4.id
  route_table_id = aws_route_table.private4.id
}