class AddNumberOfWeeksToTrainingPlans < ActiveRecord::Migration[6.1]
  def change
    add_column :training_plans, :number_of_weeks, :integer, default: 1
  end
end
