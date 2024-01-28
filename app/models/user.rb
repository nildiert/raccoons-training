class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist
         # :recoverable, :rememberable, :validatable
  has_many :training_plans
  has_many :working_days
  has_one :profile
  has_one :role
  after_create :create_profile, :create_role


  def current_training_plan
    training_plans.active
  end

  private

  def create_role
    Role.create(user: self, name: 'user')
  end
  def create_profile
    Profile.create(user: self)
  end
end
