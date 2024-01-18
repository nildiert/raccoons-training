class CreateWorkingDays < ActiveRecord::Migration[6.1]
  def change
    create_table :working_days do |t|
      t.integer :kind
      t.integer :duration
      t.date :date
      t.text :description
      t.boolean :completed
      t.references :training_week, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
