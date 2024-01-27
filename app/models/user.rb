class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist
         # :recoverable, :rememberable, :validatable
  has_many :training_plans
  has_many :working_days
  has_one :profile
  after_create :create_profile


  private

  def create_profile
    Profile.create(user: self)
  end
end
