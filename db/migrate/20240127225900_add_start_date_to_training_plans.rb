class AddStartDateToTrainingPlans < ActiveRecord::Migration[6.1]
  def change
    add_column :training_plans, :start_date, :date
  end
end
