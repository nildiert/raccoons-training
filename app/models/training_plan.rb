class TrainingPlan < ApplicationRecord
  belongs_to :user
  has_many :training_weeks, -> { order(start_date: :asc) }
  scope :active, -> { where(current: true).first }
  after_create :create_training_weeks


  private

  def create_training_weeks
    return unless start_date.present?  # Asegúrate de que la fecha de inicio exista

    weeks_data = 1.upto(number_of_weeks).map do |week_number|
      week_start_date = start_date + (week_number - 1).weeks
      {
        number: week_number,
        kind: 2,
        training_plan_id: self.id,
        start_date: week_start_date,
        created_at: Time.current,
        updated_at: Time.current
      }
    end
    TrainingWeek.insert_all(weeks_data)
    created_weeks = TrainingWeek.where(training_plan_id: self.id).order(:start_date)

    working_days = created_weeks.each_with_object([]) do |week, working_days|
      create_working_days_for_week(week, working_days)
    end
    WorkingDay.insert_all(working_days)
  end

  def create_working_days_for_week(week, working_days)
    new_working_days = (0..6).map do |day_offset|
      {
        training_week_id: week.id,
        date: week.start_date + day_offset.days,
        kind: 1,
        duration: 20,
        completed: false,
        user_id: user_id,
        created_at: Time.current,
        updated_at: Time.current
      }
    end
    working_days.concat(new_working_days)
  end


end
