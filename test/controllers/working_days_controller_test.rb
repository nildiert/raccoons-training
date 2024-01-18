require "test_helper"

class WorkingDaysControllerTest < ActionDispatch::IntegrationTest
  setup do
    @working_day = working_days(:one)
  end

  test "should get index" do
    get working_days_url, as: :json
    assert_response :success
  end

  test "should create working_day" do
    assert_difference('WorkingDay.count') do
      post working_days_url, params: { working_day: { completed: @working_day.completed, date: @working_day.date, description: @working_day.description, duration: @working_day.duration, training_week_id: @working_day.training_week_id, type: @working_day.type, user_id: @working_day.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show working_day" do
    get working_day_url(@working_day), as: :json
    assert_response :success
  end

  test "should update working_day" do
    patch working_day_url(@working_day), params: { working_day: { completed: @working_day.completed, date: @working_day.date, description: @working_day.description, duration: @working_day.duration, training_week_id: @working_day.training_week_id, type: @working_day.type, user_id: @working_day.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy working_day" do
    assert_difference('WorkingDay.count', -1) do
      delete working_day_url(@working_day), as: :json
    end

    assert_response 204
  end
end
