class AddStartDateToTrainingWeeks < ActiveRecord::Migration[6.1]
  def change
    add_column :training_weeks, :start_date, :date
  end
end
