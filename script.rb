number_of_weeks = 4

weeks_data = 1.upto(number_of_weeks).map do |week_number|
  week_start_date = Date.today + (week_number - 1).weeks
  {
    number: week_number,
    kind: 2,
    # training_plan_id: self.id,
    start_date: week_start_date,
    created_at: Time.current,
    updated_at: Time.current
  }
end