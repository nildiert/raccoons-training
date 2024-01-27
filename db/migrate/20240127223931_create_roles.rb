class CreateRoles < ActiveRecord::Migration[6.1]
  def change
    create_table :roles do |t|
      t.integer :name, default: 1
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
