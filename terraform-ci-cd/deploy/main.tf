module "deploy_ec2" {
  source          = "../infra"
  aws_region      = "us-east-1"
  instance_type   = "t2.small"
  ec2_tags        = { Name = "group2-ec2" }
  ami_id          = "ami-005de95e8ff495156"
  key_pair_name   = "group2-kp"
  ec2_volume_size = 10
  user_data       = file("../infra/user_data.sh")

  eip_tags = { Name = "group2-eip" }

  subnet_id = "subnet-04e972f3a706c00e8"
  public_ip = false

  vpc_id                  = "vpc-031420f7c99b1a0bd"
  ec2_sg_name             = "group2-ec2-sg"
  ec2_sg_description      = "Allow http over port 80 from anywhere and other ports for testing"
  ec2_sg_tags             = { Name = "group2-ec2-sg" }
  rds_sg_name             = "group2-rds-sg"
  rds_sg_description      = "Allow ec2 instance traffic"
  rds_sg_tags             = { Name = "group2-rds-sg" }
  allowed_cidr_for_ec2_sg = "<id>/32" // replace with you own ip

  rds_subnet_group_name = "group2-db-subnet-group"
  rds_subnet_id_1       = "subnet-04e972f3a706c00e8"
  rds_subnet_id_2       = "subnet-0f32e4f5a7015c2fd"
  rds_subnet_group_tags = { Name = "group2-db-subnet-group" }

  rds_identifier          = "group2-rds"
  rds_engine              = "postgres"
  rds_instance_class      = "db.t3.micro"
  rds_name                = "postgres"
  rds_username            = "postgres"
  rds_password            = "secret-group2"
  rds_allocated_storage   = 10
  rds_skip_final_snapshot = true
  rds_tags                = { Name = "group2-rds" }
}