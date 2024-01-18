class CreateTrainingPlans < ActiveRecord::Migration[6.1]
  def change
    create_table :training_plans do |t|
      t.string :name
      t.text :description
      t.references :user, null: false, foreign_key: true
      t.boolean :current, null: false, default: true

      t.timestamps
    end
  end
end
