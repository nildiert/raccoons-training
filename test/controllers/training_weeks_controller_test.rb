require "test_helper"

class TrainingWeeksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @training_week = training_weeks(:one)
  end

  test "should get index" do
    get training_weeks_url, as: :json
    assert_response :success
  end

  test "should create training_week" do
    assert_difference('TrainingWeek.count') do
      post training_weeks_url, params: { training_week: { kind: @training_week.kind, number: @training_week.number, training_plan_id: @training_week.training_plan_id } }, as: :json
    end

    assert_response 201
  end

  test "should show training_week" do
    get training_week_url(@training_week), as: :json
    assert_response :success
  end

  test "should update training_week" do
    patch training_week_url(@training_week), params: { training_week: { kind: @training_week.kind, number: @training_week.number, training_plan_id: @training_week.training_plan_id } }, as: :json
    assert_response 200
  end

  test "should destroy training_week" do
    assert_difference('TrainingWeek.count', -1) do
      delete training_week_url(@training_week), as: :json
    end

    assert_response 204
  end
end
