class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :second_name, :second_last_name, :date_of_birth, :phone_number, :strava_url
  has_one :user
end
