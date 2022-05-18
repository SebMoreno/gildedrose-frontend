module "deploy_ec2" {
  source        = "../infra"
  aws_region    = "us-east-1"
  instance_type = "t2.small"
  ec2_tags      = { Name = "grupo2-ec2" }
  ami_id        = "ami-005de95e8ff495156"
  key_pair_name = "grupo2"
  user_data     = file("../infra/user_data.sh")

  eip_tags = { Name = "grupo2-eip" }

  subnet_id = "subnet-04e972f3a706c00e8"
  public_ip = false

  sg_name             = "grupo2-sg"
  sg_description      = "Allow http over port 80 from anywhere and other ports for testing"
  vpc_id              = "vpc-031420f7c99b1a0bd"
  allowed_cidr_for_sg = "181.51.33.9/32"
  sg_tags             = { Name = "grupo2-sg" }
}