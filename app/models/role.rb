class Role < ApplicationRecord
  belongs_to :user
  enum name: { admin: 0, user: 1 }
end
