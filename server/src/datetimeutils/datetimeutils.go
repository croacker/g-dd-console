package datetimeutils

import "time"

//Преобразовать timestamp из чека(например ofdCheck.DateTime) во время.
func ParseTimestamp(timestamp int64) time.Time {
	return time.Unix(timestamp, 0)
}

func ToDatetimeString(timestamp int) string {
	return ParseTimestamp(int64(timestamp)).Format("02-01-2006 15:04:05")
}

