class CreateProfiles < ActiveRecord::Migration[6.1]
  def change
    create_table :profiles do |t|
      t.string :first_name
      t.string :last_name
      t.string :second_name
      t.string :second_last_name
      t.date :date_of_birth
      t.string :phone_number
      t.string :strava_url
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
