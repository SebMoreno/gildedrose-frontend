#######################################################
# config variables
#######################################################

variable "aws_region" {
  type        = string
  description = "AWS default region (where to deploy your resources)"
}

#######################################################
# EC2 variables
#######################################################

variable "instance_type" {
  type        = string
  description = "EC2 instance type"
}

variable "ami_id" {
  type        = string
  description = "EC2 AMI ID"
}

variable "subnet_id" {
  type        = string
  description = "Subnet to deploy your resources"
}

variable "public_ip" {
  type        = bool
  description = "Do you need public ip (true->yes,false->no)"
}

variable "key_pair_name" {
  type        = string
  description = "Key pair name"
}

variable "user_data" {
  type        = string
  description = "user data path"
}

variable "ec2_volume_size" {
  description = "The EC2 volume size"
  type        = number
}

variable "ec2_tags" {
  description = "EC2 resource tags"
  type        = map(string)
}

##############################################
# Security group variables
##############################################

variable "vpc_id" {
  type        = string
  description = "VPC ID"
}

variable "ec2_sg_name" {
  type        = string
  description = "EC2 Security group name"
}

variable "ec2_sg_description" {
  type        = string
  description = "EC2 Security group description"
}

variable "ec2_sg_tags" {
  description = "EC2 SG resource tags"
  type        = map(string)
}

variable "rds_sg_name" {
  type        = string
  description = "RDS Security group name"
}

variable "rds_sg_description" {
  type        = string
  description = "RDS Security group description"
}

variable "rds_sg_tags" {
  description = "RDS SG resource tags"
  type        = map(string)
}

variable "allowed_cidr_for_ec2_sg" {
  description = "CIDR (IP) to allow inbound traffic over tcp for ssh and other ports for testing"
  type        = string
}

#######################################################
# EIP variables
#######################################################

variable "eip_tags" {
  description = "EIP resource tags"
  type        = map(string)
}

#######################################################
# RDS subnet group variables
#######################################################

variable "rds_subnet_group_name" {
  description = ""
  type        = string
}
variable "rds_subnet_id_1" {
  description = ""
  type        = string
}
variable "rds_subnet_id_2" {
  description = ""
  type        = string
}
variable "rds_subnet_group_tags" {
  description = ""
  type        = map(string)
}

#######################################################
# RDS variables
#######################################################

variable "rds_identifier" {
  description = ""
  type        = string
}
variable "rds_engine" {
  description = ""
  type        = string
}
variable "rds_instance_class" {
  description = ""
  type        = string
}
variable "rds_name" {
  description = ""
  type        = string
}
variable "rds_username" {
  description = ""
  type        = string
}
variable "rds_password" {
  description = ""
  type        = string
}
variable "rds_allocated_storage" {
  description = ""
  type        = number
}
variable "rds_skip_final_snapshot" {
  description = ""
  type        = bool
}
variable "rds_tags" {
  description = ""
  type        = map(string)
}
