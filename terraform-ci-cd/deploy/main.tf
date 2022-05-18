module "deploy_ec2" {
  source        = "../infra"
  aws_region    = "us-east-1"
  instance_type = "t2.small"
  ec2_tags      = { Name = "grupo2-jenkins-server" }
  ami_id        = "ami-005de95e8ff495156"
  key_pair_name = "grupo2"
  user_data     = file("../infra/user_data.sh")

  eip_tags = { Name = "Pacman-demo-terraform-sg" }

  subnet_id = "subnet-04e972f3a706c00e8"
  public_ip = false

  sg_name             = "grupo2-sg"
  sg_description      = "Allow http over port 80 and ssh over port 22"
  vpc_id              = "vpc-031420f7c99b1a0bd"
  allowed_cidr_for_sg = ""
  sg_tags             = { Name = "Pacman-demo-terraform-sg" }
}