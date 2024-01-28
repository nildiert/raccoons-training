class TrainingWeek < ApplicationRecord
  belongs_to :training_plan
  has_many :working_days, -> { order(date: :asc) }


  after_create :create_working_days

  enum kind: {
    rest: 0,
    hard: 1,
    accumulative: 2
  }

  def create_working_days
    week_start_date = training_plan.start_date + (number - 1).weeks
    working_days_data = (0..6).map do |day_offset|
      {
        training_week_id: self.id,
        date: week_start_date + day_offset.days,
        kind: 1,
        duration: 20,
        completed: false,
        user_id: training_plan.user_id,
        created_at: Time.current,
        updated_at: Time.current
      }
    end
    WorkingDay.insert_all(working_days_data)
  end


  def active

  end
end
