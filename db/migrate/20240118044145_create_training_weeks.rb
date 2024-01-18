class CreateTrainingWeeks < ActiveRecord::Migration[6.1]
  def change
    create_table :training_weeks do |t|
      t.integer :number
      t.integer :kind
      t.references :training_plan, null: false, foreign_key: true

      t.timestamps
    end
  end
end
